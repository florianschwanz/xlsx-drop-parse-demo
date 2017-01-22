import { FooDemoPage } from './app.po';

describe('foo-demo App', function() {
  let page: FooDemoPage;

  beforeEach(() => {
    page = new FooDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
