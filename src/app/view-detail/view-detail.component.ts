import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})
export class ViewDetailComponent {

  userId!: any;
  data: any[] = [];
  editForm!: FormGroup;
  imageUrls: string[] = [];
  user_profile_images: any;
  current_amount: any = 0;
  userDetails: any[] = [];
  pattern1 = "^[0-9_\\-+]{10,14}$";

  constructor(private route: ActivatedRoute, private service: SharedService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      this.userId = params.get('userId');
    });
    this.initEditForm();
    this.fetchUserData(this.userId);
    this.getTransaction(this.userId);
  }

  initEditForm() {
    this.editForm = new FormGroup({
      fullName: new FormControl({ value: '', disabled: true }),
      dob: new FormControl({ value: '', disabled: true }),
      address: new FormControl({ value: '', disabled: true }),
      mobileNumber: new FormControl({ value: '', disabled: true }),
      bio: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: '', disabled: true }),
      images: new FormControl(null),
      profile_images: new FormControl(null),
      // newActivity: new FormControl('', Validators.required),
      // price: new FormControl('', Validators.required),
    })
  }

  getTransaction(userId: any) {
    const formURlData = new URLSearchParams();
    formURlData.set('user_id', userId);
    this.service.postAPI('adminRouter/transcationListByUserId', formURlData.toString()).subscribe({
      next: (resp: any) => {
        this.data = resp.detail.reverse();
        this.current_amount = resp.detail[0].current_amount
      },
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }

  fetchUserData(userId: any) {
    this.service.getApi(`adminRouter/get_user_byId?id=${userId}`).subscribe((response: any) => {
      if (response.success) {
        this.user_profile_images = response.detail[0]?.profile_images
        this.userDetails = response.detail[0];
        const userData = response.detail[0];


        this.editForm.patchValue({
          fullName: userData.fullName,
          dob: this.convertDateFormat(userData.dob),
          address: userData.address,
          mobileNumber: userData.mobileNumber,
          bio: userData.bio,
          gender: userData.gender,
          newActivity: userData.activity?.length > 0 ? userData.activity[0].activity : '',
          price: userData.activity?.length > 0 ? userData.activity[0].price : ''

        });

        if (userData.images) {
          this.imageUrls = JSON.parse(userData.images).map((image: any) => `http://13.49.50.173:4000/profile/${image}`);
        }

      }
    });
  }

  convertDateFormat(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return '';
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }


}
