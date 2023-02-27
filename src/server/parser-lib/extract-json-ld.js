// @ts-nocheck
// More info on JSON-LD (Linked Data):
// https://moz.com/blog/json-ld-for-beginners

module.exports = function (/** @type {(arg0: string) => { (): any; new (): any; attr: { (arg0: string): string; new (): any; }; text: { (): string; new (): any; }; }} */ $) {
  const $scriptTags = $('script')
  var extracted = {}

  try {
    // @ts-ignore
    $scriptTags.each(function (index, el) {
      if ($(this).attr('type') && $(this).attr('type') === 'application/ld+json') {
        extracted = JSON.parse($(this).text())
      }
    })
  } catch (e) { }

  return extracted
}