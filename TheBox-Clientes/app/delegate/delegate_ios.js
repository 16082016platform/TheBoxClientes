"use strict";
var newUITextFieldDelegateImpl = (function (_super) {
    __extends(newUITextFieldDelegateImpl, _super);
    function newUITextFieldDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    newUITextFieldDelegateImpl.initWithOriginalDelegate = function (originalDelegate, maxl) {
        console.log("initWithOwner");
        var delegate = newUITextFieldDelegateImpl.new();
        delegate._originalDelegate = originalDelegate;
        delegate.maxlegth = maxl;
        return delegate;
    };
    newUITextFieldDelegateImpl.prototype.textFieldShouldBeginEditing = function (textField) {
        return this._originalDelegate.textFieldShouldBeginEditing(textField);
    };
    newUITextFieldDelegateImpl.prototype.textFieldDidEndEditing = function (textField) {
        return this._originalDelegate.textFieldDidEndEditing(textField);
    };
    newUITextFieldDelegateImpl.prototype.textFieldShouldClear = function (textField) {
        return this._originalDelegate.textFieldShouldClear(textField);
    };
    newUITextFieldDelegateImpl.prototype.textFieldShouldReturn = function (textField) {
        return this._originalDelegate.textFieldShouldReturn(textField);
    };
    newUITextFieldDelegateImpl.prototype.textFieldShouldChangeCharactersInRangeReplacementString = function (textField, range, replacementString) {
        console.log(this.maxlegth);
        if (this.maxlegth <= textField.text.length) {
            return false;
        }
        return this._originalDelegate.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
    };
    return newUITextFieldDelegateImpl;
}(NSObject));
newUITextFieldDelegateImpl.ObjCProtocols = [UITextFieldDelegate];
exports.newUITextFieldDelegateImpl = newUITextFieldDelegateImpl;
