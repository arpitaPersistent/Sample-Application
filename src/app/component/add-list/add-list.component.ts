import { Component, OnInit } from '@angular/core';
import { ListService } from '../../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {
  listForm: FormGroup;
  private sub: any;
  oldVal: string;
  listName: string;
  sameName: string;
  same: boolean;
  submitted = false;

  constructor(private listService: ListService, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.listForm = this.fb.group({
      listName: [null, [Validators.required]]
    });

    if (this.route.snapshot.paramMap.get('list')) {
      this.listForm.patchValue({ listName: this.route.snapshot.paramMap.get('list')});
      this.oldVal = this.route.snapshot.paramMap.get('list');
    }
  }

  /*
  ** Back to the main Page   **
  */
  public back() {
    this.router.navigateByUrl('');
  }

  /*
  **  Submit Form   **
  */
  public onSubmit(): void {
    this.same = false;
    this.submitted = true;
    if (!this.listForm.value.listName) { return; }
    const check = this.listService.addList(this.listForm.value.listName, this.oldVal);
    if (!check) {
      this.same = true;
      this.sameName = 'List Name Already exist.';
      return;
    }
  }

}
