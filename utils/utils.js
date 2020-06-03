export function $parseVars2Str(...args) {
  // return Array.prototype.join.call(arguments , ',');
  return args.join(",")
}

export function $attr(e, key) {
  return e.currentTarget.dataset[key]
}