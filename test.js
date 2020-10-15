array = [
    'Galaxy Cà Mau',          'Galaxy Cà Mau',          'Galaxy Cà Mau',
    'Galaxy Cà Mau',          'Galaxy Cà Mau',          'Galaxy Cà Mau',
    'Galaxy Cà Mau',          'Galaxy Bến Tre',         'Galaxy Bến Tre',
    'Galaxy Bến Tre',         'Galaxy Bến Tre',         'Galaxy Bến Tre',
    'Galaxy Huỳnh Tấn Phát',  'Galaxy Huỳnh Tấn Phát',  'Galaxy Huỳnh Tấn Phát']


console.log(new Set(array));


var formValues = [
    { field: 'name', value: 'Sơn Đặng' },
]

function getRequestBodyFromValues(formValues) {
    var result = [];
    return formValues.map(function (item) {
        return item;
    })
}
console.log(getRequestBodyFromValues(formValues));