import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.less']
})
export class LoginViewComponent implements OnInit {

  hidePassword: boolean = true;

  options: FormGroup;

  constructor(fb : FormBuilder)
  {
    this.options = fb.group({
      color: 'primary'
    });
  }

  ngOnInit() {
  }

}
