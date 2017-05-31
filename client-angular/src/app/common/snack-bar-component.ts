import {Component} from "@angular/core";


/**
 * Created by marcofalsitta on 31.05.17.
 */
@Component({
  selector: 'snack-bar-component-message',
  templateUrl: './snack-bar-component.html',
  styleUrls: ['./snack-bar-component.css'],
})
export class SnackBarMessageComponent {

  public message:string = "none";
  public type:string = "alert";


}
