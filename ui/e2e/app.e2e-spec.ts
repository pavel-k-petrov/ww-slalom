import { SlalomUiPage } from './app.po';

describe('slalom-ui App', function() {
  let page: SlalomUiPage;

  beforeEach(() => {
    page = new SlalomUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
