export function toJSON(obj: any) {
    var props: any = {};
    for (var x in obj) {
        if (obj.hasOwnProperty(x)) props[x] = obj[x]
    }
    return props
}