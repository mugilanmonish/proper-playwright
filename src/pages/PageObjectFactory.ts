import type { Page } from '@playwright/test';
import { LoginActions } from '@actions/login.actions';
import { HeaderActions } from '@actions/header/header.actions';
import { AccountSettingsActions } from '@actions/header/accountSettings/accountSetting.actions';
import { ProfileMainActions } from '@actions/header/accountSettings/profile/profile-main.actions';
import { MyWalletTabActions } from '@actions/header/accountSettings/profile/myWallet-tab.actions';
import { MyProfileTabActions } from '@actions/header/accountSettings/profile/myProfile-tab.actions';
import { MyLikesTabActions } from '@actions/header/accountSettings/profile/myLikes-tab.actions';
import { MyAddressTabActions } from '@actions/header/accountSettings/profile/myAddress-tab.actions';

export class PageObjectFactory {
    private _loginActions?: LoginActions;
    private _headerActions?: HeaderActions;
    private _accountSettingsMainActions?: AccountSettingsActions;
    private _profileMainActions?: ProfileMainActions;
    private _myWalletTabActions?: MyWalletTabActions;
    private _myProfileTabActions?: MyProfileTabActions;
    private _myLikesTabActions?: MyLikesTabActions;
    private _myAddressTabActions?: MyAddressTabActions;

    constructor(private readonly page: Page) {
        this.page = page;
    }

    get loginActions(): LoginActions {
        return (this._loginActions ??= new LoginActions(this.page));
    }
    get headerActions(): HeaderActions {
        return (this._headerActions ??= new HeaderActions(this.page));
    }
    get accountSettingsMainActions(): AccountSettingsActions {
        return (this._accountSettingsMainActions ??= new AccountSettingsActions(this.page));
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
}
