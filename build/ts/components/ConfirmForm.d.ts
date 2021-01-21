import { FunctionComponent } from "react";
interface ConfirmFormComponent {
    message: string;
    btnText: string;
    confirmHandler(): void;
    cancleHandler(): void;
}
declare const ConfirmForm: FunctionComponent<ConfirmFormComponent>;
export default ConfirmForm;
