import { Component, OnInit,  AfterViewInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
      this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "51544191821-8abgc0dip3oo7hmk0k12d7v7jjtjglh9.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
  });
  google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
  );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
    .subscribe( resp => {
      //console.log( { login: resp })
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      })
      
    })
  }

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  login() {
    console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        if( this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value!);
        }else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );

    //this.router.navigateByUrl('/');
  }
}
