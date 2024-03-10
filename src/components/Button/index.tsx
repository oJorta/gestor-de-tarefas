import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: "sm" | "md" | "lg";
    variant: "primary" | "secondary";
    className?: string;
}

export default function Button({ children, size, variant, ...props}: ButtonProps) {
    return (
        <button 
            {...props}
            className={`${styles.button} ${styles[size]} ${styles[variant]}`}
        >
            {children}
        </button>
    )
}