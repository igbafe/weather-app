import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

const SubmitButton = ({ isLoading, children, className }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
