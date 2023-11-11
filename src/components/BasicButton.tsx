import React, { forwardRef, Ref } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function BasicButton(props: ButtonProps, ref: Ref<HTMLButtonElement>) {
    const { children, className = "", type = "button", ...rest } = props;

    return (
        <button className={className} ref={ref} type={type} {...rest} tabIndex={0}>
            {children}
        </button>
    );
}

export default forwardRef(BasicButton);
