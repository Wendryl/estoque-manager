import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  private _value: any = '';
  @Input('invalid')
  isInvalid = false;
  onChange: any = (value: any) => { };
  onTouched: any = () => { };

  @Input('label')
  inputLabel?: string;

  @Input('id')
  inputId?: string;

  @Input('type')
  inputType = 'text';

  @Input('placeholder')
  inputPlaceholder?: string;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(this._value);
  }

  doInput(event: any) {
    this.value = event.value;
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
