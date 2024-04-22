export default function NotAuthenticatedMessage() {
    return (
        <div className="w-full flex mt-16 flex-col gap-4 items-center">
            <p className="font-bold text-4xl">Oops...</p>
            <p>It's looks like you are not logged into your account</p>
            <p className="font-bold text-xl">Please <span className="text-secondary">Login</span> or <span
                className="text-secondary">Sign Up</span> first</p>
        </div>
    );
}