import * as React from "react";
interface EditViewComponent {
    user: {
        status: boolean;
        role: string;
    };
}
declare const PostEditView: React.FunctionComponent<EditViewComponent>;
export default PostEditView;
