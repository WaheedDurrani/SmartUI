import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountType } from 'src/app/Models/DiscountTypeModel';
import { GenericServiceService } from 'src/app/Services/generic-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialougeComponent } from '../dialouge/dialouge.component';

@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styles: []
})
export class RegularComponent implements OnInit {

  displayedColumns: string[] = ['name', 'academicYearId', 'instituteId', 'description','createdDate' ,'modifiedDate', 'action' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm: FormGroup;
  heading = 'Regular Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';
  discount: DiscountType = new DiscountType();
  discountTypeList: DiscountType[]
  page:String
  constructor(private dialog: MatDialog,private fb: FormBuilder, private genericService: GenericServiceService, private modalService: NgbModal, private router: Router) {
  }

  // @ViewChild('content') addview !: ElementRef





  ngOnInit() {
this.getAllProducts();

  }

  // openDialog() {
  //   this.dialog.open(DialougeComponent, {
  //    width:'30%'
  //   }).afterClosed().subscribe(val=>{
  
  //       this.getAllProducts();
      
  //   })
  // }


  openDialog(): void {
    this.dialog.open(DialougeComponent, {
   
      data: { 
       page: this.page,
       
   
        }
       
    }).afterClosed().subscribe(val=>{
  
             this.getAllProducts();
          
         });
 
  }



  EditopenDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialougeComponent, {
      data:obj
    });
    console.log(obj);
    

  }


  

  getAllProducts(){
    this.genericService.getAllDiscount().subscribe({
      next : (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        
      },
      error :()=>{
        console.log('Something wrong');
        
      }
    })
       } 

       deleteProduct(id:number){
        this.genericService.deleteObject(id)
        .subscribe({
          next:(res)=>{
            alert('Record deleted Successfully')
            this.getAllProducts();
          },
          error:()=>{
        alert('Something went wrong while deleting record')
          }
        })
           }

           editProduct(row:any){
            this.dialog.open(DialougeComponent , {
              width:'30%',
              data:row
            }).afterClosed().subscribe(val=>{
              if(val==='update'){
                this.getAllProducts();
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
