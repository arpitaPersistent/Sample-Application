import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../../card.service';
import { ListService } from '../../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {

  cardName: string;
  cardForm: FormGroup;
  private sub: any;
  card: Array<any>;
  listName: string;
  oldName: string;
  sameName: string;
  same: boolean;
  list: Array<any>;
  submitted = false;

  constructor(private cardService: CardService, private fb: FormBuilder, private router: Router,
              private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  /*
  ** load Form and set form fields   **
  */
  private loadData() {
    this.cardForm = this.fb.group({
      cardName: [null, [Validators.required]],
      listName: [null, [Validators.required]]
    });
    this.sub = this.route.params.subscribe(params => {
      if (params) {
        this.cardName = params.cardName;
        this.oldName = this.cardName;
        this.card = this.cardService.getCard();

        const data = this.card.find(el => el.cardName === this.cardName);
        if (data) {
          this.listName = data.list;
          this.cardForm.patchValue({ cardName: this.cardName, listName: this.listName});
        }
        // In a real app: dispatch action to load the details here.
      }
    });
    if (this.route.snapshot.paramMap.get('list')) {
      this.cardForm.patchValue({ listName: this.route.snapshot.paramMap.get('list')});
    }
    this.list = this.listService.getList();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /*
  **  Back to the main screen   **
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
    if (!this.cardForm.value.cardName || !this.cardForm.value.listName) { return; }
    const item = {cardName: this.cardForm.value.cardName, list: this.cardForm.value.listName};
    const check = this.cardService.addCard(item, this.oldName);
    if (!check) {
      this.same = true;
      this.sameName = 'Card Name Already exist.';
    }
  }
}
