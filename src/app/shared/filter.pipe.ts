import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!value || !searchTerm) {
      return value;
    }

    return value.filter(item => {
      return item.fullName && item.fullName.toLowerCase().includes(searchTerm) || item.mobileNumber && item.mobileNumber.toString().includes(searchTerm) ||
      item.boySide?.fullName && item.boySide?.fullName.toLowerCase().includes(searchTerm) || item.girlSide?.fullName && item.girlSide?.fullName.toLowerCase().includes(searchTerm) 
    });
  }
  //date_raised
}



@Pipe({
  name: 'filter2'
})
export class FilterPipe2 implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    console.log(searchTerm);
    
    if (!value || !searchTerm) {
      return value;
    }

    const test =  value.filter(item => {
      item.paid_to_User.fullName && item.paid_to_User.fullName.toLowerCase().includes(searchTerm) || item.recived_from_User.fullName && item.recived_from_User.fullName.toLowerCase().includes(searchTerm) ||
      item.paid_to_User.mobileNumber && item.paid_to_User.mobileNumber.toString().includes(searchTerm) || item.recived_from_User.mobileNumber && item.recived_from_User.mobileNumber.toString().includes(searchTerm)
    });
    console.log('===========>', test)
    return test
   
  }
  //date_raised
}