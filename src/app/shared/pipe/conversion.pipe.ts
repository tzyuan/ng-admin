import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})


/**
 * 数据转换
 * 编号转换为相应的文字
 */
export class ConversionPipe implements PipeTransform {

  transform(value: any, data: any[]): any {
    // tslint:disable-next-line:variable-name
    let _value = [];
    if (typeof value === 'string') {
      value = value.split(':');
    }
    data.forEach(res => {
      // value是数组的情况
      if (value instanceof Array) {
        value.forEach(item => {
          if (`${item}` === `${res.value}`) {
            _value = [..._value, `${res.label}`];
          }
        });
        return;
      }
      if (value === res.value) {
        _value = res.label;
      }
    });
    // return _value.replace(/(.*)[,，]$/, '$1');
    return _value.join(',');
  }
}
