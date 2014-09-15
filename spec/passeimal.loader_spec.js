describe("Passeimal.Loader", function(){
  var loading, page, loader;

  beforeEach(function(){
    loading = $("<div/>");
    page = $("<div/>");

    loader = new Passeimal.Loader(loading, page);
    loader.init();
  });

  it("displays page", function(){
    expect(page.is(".hidden")).toBeFalsy();
  });

  it("hides loading", function(){
    expect(loading.is(".hidden")).toBeTruthy();
  });
});