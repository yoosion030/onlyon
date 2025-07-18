import { cn } from "@repo/utils";
import Image from "next/image";
import type { ComponentProps } from "react";
import { A, H1, Li, Ul } from "../mdx-components";

type ProfileSectionProps = {
  info: {
    label: string;
    value: string;
    href?: string;
  }[];
  profileImage: string;
} & ComponentProps<"div">;

const ProfileSection = ({
  info,
  profileImage,
  className,
  ...props
}: ProfileSectionProps) => {
  return (
    <div
      className={cn(
        "flex",
        "gap-4",
        "justify-between",
        "items-start",
        className,
      )}
      {...props}
    >
      <div>
        <H1 className={cn("mt-0")}>프로필</H1>
        <Ul>
          {info.map((item) => (
            <Li key={item.label}>
              <span>{item.label}: </span>
              {item.href ? (
                <A href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.value}
                </A>
              ) : (
                <span>{item.value}</span>
              )}
            </Li>
          ))}
        </Ul>
      </div>

      <div>
        <Image src={profileImage} alt="profile" width={300} height={300} />
      </div>
    </div>
  );
};

export default ProfileSection;
