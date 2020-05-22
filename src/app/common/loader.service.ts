import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  showLoader = false;

  processOperation(promise: Promise<any>): Promise<any> {
    this.showLoader = true;
    $('.blured').addClass('blur');
    $('#loader').show();
    return new Promise((resolve, reject) => {
      promise.then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      }).finally(() => {
        this.showLoader = false;
        $('#loader').hide();
        $('.blured').removeClass('blur');
      });
    });
  }

  hideLoader(): void {
    $('#loader').hide();
  }
}
