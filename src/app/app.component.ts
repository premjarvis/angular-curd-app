import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'employee-curd';

  displayedColumns: string[] = ['fName', 'lName', 'dob', 'gender', 'email', 'mobile', 'address', 'country', 'salary', 'socialAccount', 'actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService) {
  }

  ngOnInit(): void {
    this.getAllEmpRecords()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save') {
        this.getAllEmpRecords()
      }
    })
  }

  getAllEmpRecords() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error:() => {
          alert("Error while fetching the Employee Records!!!")
        }
      })
  }

  editEmpRecord(row : any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllEmpRecords()
      }
    })
  }

  deleteEmpRecord(id : number) {
    this.api.deleteEmployee(id)
      .subscribe({
        next:(res) => {
          alert("Employee Record Deleted Successfully....")
          this.getAllEmpRecords()
        },
        error:() => {
          alert("Error while deleting the Employee Record!!!!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
