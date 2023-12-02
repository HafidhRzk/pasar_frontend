function HelperText({ className, children }) {
    return (
        <div className={`text-center text-slate-400 ${className}`}>{children}</div>
    )
}

export default HelperText