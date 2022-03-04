import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  genderList = ["Male", "Female"]
  employeeForm !: FormGroup
  actionBtn : string = "Save"

  constructor(
    private  fb : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fName : ['', Validators.required],
      lName : ['', Validators.required],
      dob : ['', Validators.required],
      gender : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      mobile : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      address : ['', Validators.required],
      country : ['', Validators.required],
      salary : ['', Validators.required],
      socialAccount : ['', Validators.required]
    })
    console.log(this.editData)
    if(this.editData) {
      this.actionBtn = "Update"
      this.employeeForm.controls['fName'].setValue(this.editData.fName)
      this.employeeForm.controls['lName'].setValue(this.editData.lName)
      this.employeeForm.controls['dob'].setValue(this.editData.dob)
      this.employeeForm.controls['gender'].setValue(this.editData.gender)
      this.employeeForm.controls['email'].setValue(this.editData.email)
      this.employeeForm.controls['mobile'].setValue(this.editData.mobile)
      this.employeeForm.controls['address'].setValue(this.editData.address)
      this.employeeForm.controls['country'].setValue(this.editData.country)
      this.employeeForm.controls['salary'].setValue(this.editData.salary)
      this.employeeForm.controls['socialAccount'].setValue(this.editData.socialAccount)
    }
  }


  addEmployee() {
    console.log(this.employeeForm.value)
    if(!this.editData) {
      if(this.employeeForm.valid) {
        this.api.postEmployee(this.employeeForm.value)
          .subscribe({
            next:(res) => {
              alert("Employee Record Added Successfully.....")
              this.employeeForm.reset()
              this.dialogRef.close('save')
            },
            error:() => {
              alert("Error while adding the Record!!!!")
            }
          })
      }
    } else {
      this.updateEmpRecord()
    }
  }


  updateEmpRecord() {
    this.api.putEmployee(this.employeeForm.value, this.editData.id).subscribe({
        next:(res) => {
          alert("Employee Record Updated Successfully.....")
          this.employeeForm.reset()
          this.dialogRef.close("update")
        },
        error:() => {
          alert("Error while Updating the Employee Record!!!")
        }
      })
  }


}
