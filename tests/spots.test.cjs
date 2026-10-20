const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

async function setup({ missingSDK = false } = {}) {
    function element(cat) {
        const classes = new Set();
        return {
            dataset: { cat }, style: {}, children: [], events: {}, attrs: {},
            classList: {
                add: name => classes.add(name), remove: name => classes.delete(name),
                toggle(name, value) { value ? classes.add(name) : classes.delete(name); },
                contains: name => classes.has(name)
            },
            addEventListener(name, fn) { this.events[name] = fn; },
            setAttribute(name, value) { this.attrs[name] = value; },
            appendChild(child) { this.children.push(child); },
            querySelectorAll() { return this.children; },
            set innerHTML(value) { this.children = []; this.markup = value; },
            remove() {}
        };
    }
    const categories = ['all', '產業與歷史', '傳統手工藝'];
    const mapFilters = categories.map(element), gridFilters = categories.map(element);
    const artwork = element(), status = element();
    const ids = Object.fromEntries(['btnViewMap', 'btnViewGrid', 'mapCanvas',
        'spotsGridView', 'spotsCardsGrid'].map(id => [id, element()]));
    let ready, resolveData;
    const result = new Promise(resolve => { resolveData = resolve; });
    const context = {
        console: { error() {} },
        window: missingSDK ? {} : {
            supabase: { createClient: () => ({
                from: () => ({ select: () => ({ order: () => result }) })
            }) }
        },
        document: {
            addEventListener(name, fn) { ready = fn; },
            getElementById: id => ids[id] || null,
            querySelectorAll: selector => selector === '.grid-filter-tag' ? gridFilters : mapFilters,
            querySelector: selector => selector === '.map-artwork-container' ? artwork : status,
            createElement: () => element()
        }
    };
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/spots.js'), 'utf8'), context);
    await ready();
    return { mapFilters, gridFilters, artwork, ids, status, resolveData };
}

test('map filters work before data arrives, filter pins, and persist across views', async () => {
    const s = await setup();
    s.mapFilters[1].events.click();
    assert.equal(s.gridFilters[1].attrs['aria-pressed'], 'true');
    s.resolveData({ data: [
        { id: 'a', title: 'A', category: '產業與歷史' },
        { id: 'b', title: 'B', category: '傳統手工藝' }
    ] });
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(s.artwork.children.map(pin => pin.style.display), ['flex', 'none']);
    assert.equal(s.ids.spotsCardsGrid.children.length, 1);
    s.ids.btnViewGrid.events.click();
    assert.equal(s.ids.spotsCardsGrid.children.length, 1);
    s.gridFilters[2].events.click();
    assert.equal(s.mapFilters[2].attrs['aria-pressed'], 'true');
    assert.deepEqual(s.artwork.children.map(pin => pin.style.display), ['none', 'flex']);
    s.ids.btnViewMap.events.click();
    s.mapFilters[0].events.click();
    assert.deepEqual(s.artwork.children.map(pin => pin.style.display), ['flex', 'flex']);
    assert.equal(s.ids.spotsCardsGrid.children.length, 2);
});

test('missing SDK does not disable filters or view controls and reports failure', async () => {
    const s = await setup({ missingSDK: true });
    s.mapFilters[1].events.click();
    assert.equal(s.mapFilters[1].attrs['aria-pressed'], 'true');
    s.ids.btnViewGrid.events.click();
    assert.equal(s.ids.spotsGridView.style.display, 'block');
    assert.match(s.status.textContent, /載入失敗/);
});

test('database errors replace the loading indicator', async () => {
    const s = await setup();
    s.resolveData({ error: { message: 'Network unavailable' } });
    await new Promise(resolve => setImmediate(resolve));
    assert.match(s.status.textContent, /載入失敗/);
});

test('all local icons resolve, including database title variants', () => {
    const context = { document: { addEventListener() {} } };
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/spots.js'), 'utf8'), context);
    const directory = path.join(__dirname, '../assets/illustrations');
    fs.readdirSync(directory).filter(file => file.endsWith('.png')).forEach(file => {
        assert.equal(context.getSpotIllustration(file.slice(0, -4)), `assets/illustrations/${file}`);
    });
    assert.equal(context.getSpotIllustration('笑咪咪懸絲偶劇團'), 'assets/illustrations/笑瞇瞇.png');
    assert.equal(context.getSpotIllustration('文化科技創新基地'), 'assets/illustrations/文化創新基地.png');
    assert.equal(context.getSpotIllustration('嘉藝點水道頭文創聚落'), 'assets/illustrations/水道頭文創聚落.png');
    assert.equal(context.getSpotIllustration('未設定的新據點'), '');
});

test('map preview uses illustration while the catalogue keeps its database photo', async () => {
    const s = await setup();
    s.resolveData({ data: [{ id: 'museum', title: '故宮南院', image_url: 'museum-photo.jpg' }] });
    await new Promise(resolve => setImmediate(resolve));
    assert.match(s.artwork.children[0].markup, /assets\/illustrations\/故宮南院\.png/);
    assert.ok(!s.artwork.children[0].markup.includes('museum-photo.jpg'));
    assert.match(s.ids.spotsCardsGrid.children[0].markup, /museum-photo\.jpg/);
});
