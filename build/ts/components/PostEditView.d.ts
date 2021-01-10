import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface EditViewComponent {
    user: UserComponentData;
}
declare const PostEditView: React.FunctionComponent<EditViewComponent>;
export default PostEditView;
