import { FunctionComponent } from "react";
interface ConfirmFormComponent {
    message: string;
    btnText: string;
    confirmHandler(): void;
    cancelHandler(): void;
}
declare const ConfirmForm: FunctionComponent<ConfirmFormComponent>;
export default ConfirmForm;
