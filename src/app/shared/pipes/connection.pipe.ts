import { Pipe, PipeTransform } from '@angular/core';
interface ConnectionMapper {
  [key: string]: string;
}
@Pipe({
  name: 'connection',
  standalone: true,
})
export class ConnectionPipe implements PipeTransform {
  mapper: ConnectionMapper = {
    1: 'Connection',
    2: 'Connection',
    3: 'No connection',
  };
  classMapper: ConnectionMapper = {
    1: 'green',
    2: 'orange',
    3: 'red',
  };
  transform(value: number, isClass?: boolean): string | null {
    if (isClass) {
      return this.classMapper[value];
    }
    return this.mapper[value];
  }
}
