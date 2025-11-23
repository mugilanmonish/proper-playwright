import type { Page } from '@playwright/test';
import { LoginActions } from '@actions/login.actions';
import { HeaderActions } from '@actions/header/header.actions';
import { AccountSettingsActions } from '@actions/header/accountSettings/accountSetting.actions';
import { ProfileMainActions } from '@actions/header/accountSettings/profile/profile-main.actions';
import { MyWalletTabActions } from '@actions/header/accountSettings/profile/myWallet-tab.actions';
import { MyProfileTabActions } from '@actions/header/accountSettings/profile/myProfile-tab.actions';
import { MyLikesTabActions } from '@actions/header/accountSettings/profile/myLikes-tab.actions';
import { MyAddressTabActions } from '@actions/header/accountSettings/profile/myAddress-tab.actions';
import { ProductDescriptionActions } from '@actions/productDescription.actions';
import { AddressActions } from '@actions/address.actions';
import { CartActions } from '@actions/cart.actions';
import { PaymentActions } from '@actions/payment.actions';
import { MyOrdersActions } from '@actions/myOrders.action';

export class PageObjectFactory {
    private _loginActions?: LoginActions;
    private _headerActions?: HeaderActions;
    private _accountSettingActions?: AccountSettingsActions;
    private _profileMainActions?: ProfileMainActions;
    private _myWalletTabActions?: MyWalletTabActions;
    private _myProfileTabActions?: MyProfileTabActions;
    private _myLikesTabActions?: MyLikesTabActions;
    private _myAddressTabActions?: MyAddressTabActions;
    private _productDescriptionActions?: ProductDescriptionActions;
    private _addressActions?: AddressActions;
    private _cartActions?: CartActions;
    private _paymentActions?: PaymentActions;
    private _myOrdersActions?: MyOrdersActions;

    constructor(private readonly page: Page) {
        this.page = page;
    }

    get loginActions(): LoginActions {
        return (this._loginActions ??= new LoginActions(this.page));
    }
    get headerActions(): HeaderActions {
        return (this._headerActions ??= new HeaderActions(this.page));
    }
    get accountSettingActions(): AccountSettingsActions {
        return (this._accountSettingActions ??= new AccountSettingsActions(this.page));
    }
    get profileMainActions(): ProfileMainActions {
        return (this._profileMainActions ??= new ProfileMainActions(this.page));
    }
    get myWalletTabActions(): MyWalletTabActions {
        return (this._myWalletTabActions ??= new MyWalletTabActions(this.page));
    }
    get myProfileTabActions(): MyProfileTabActions {
        return (this._myProfileTabActions ??= new MyProfileTabActions(this.page));
    }
    get myLikesTabActions(): MyLikesTabActions {
        return (this._myLikesTabActions ??= new MyLikesTabActions(this.page));
    }
    get myAddressTabActions(): MyAddressTabActions {
        return (this._myAddressTabActions ??= new MyAddressTabActions(this.page));
    }

    get productDescriptionActions(): ProductDescriptionActions {
        return (this._productDescriptionActions ??= new ProductDescriptionActions(this.page));
    }

    get cartActions(): CartActions {
        return (this._cartActions ??= new CartActions(this.page));
    }

    get addressActions(): AddressActions {
        return (this._addressActions ??= new AddressActions(this.page));
    }

    get paymentActions(): PaymentActions {
        return (this._paymentActions ??= new PaymentActions(this.page));
    }

    get myOrdersActions(): MyOrdersActions {
        return (this._myOrdersActions ??= new MyOrdersActions(this.page));
    }
}
