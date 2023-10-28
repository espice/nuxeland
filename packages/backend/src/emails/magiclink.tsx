import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Link,
  Text,
  Row,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const MagicLinkMail = ({ link }: { link: string }) => {
  const previewText = `Confirm your account`;
  const confirmLink = link;
  const code = "4fspr-3mdbb";

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-transparent my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid shadow-sm border-[#EAEAEA] w-[450px] rounded-2xl p-16 my-8">
            <Section>
              <Img
                className="mx-auto"
                src="https://i.ibb.co/cJ25RY4/minimum-logo1-removebg-preview-m3-ROWE-T1-transformed-transformed.png"
                alt="Minimum's Logo"
              />
            </Section>

            <Heading className="text-black text-[16px] font-medium text-center p-0 my-[30px] mx-0">
              Confirm your account on Minimum
            </Heading>

            <Section className="text-center my-16">
              <Button
                className="border border-solid border-neutral-800/25 rounded-full text-black text-[14px] font-semibold no-underline w-full py-3"
                href={confirmLink}
              >
                Confirm your account
              </Button>
              <Text className="bg-[#FBFAF9] border border-dashed border-black/10 rounded-full text-black/50 text-[14px] font-mono font-semibold py-2">
                {code}
              </Text>
              <Text className="text-black/50 text-[12px]">
                If the link does not work, you can use the login code directly.
              </Text>
            </Section>

            <Hr className="w-[320px] m-0" />
            <Row className="text-black/50 inline-flex items-center">
              <Column className="w-full">
                <Text className="text-[12px] font-medium">Minimum</Text>
              </Column>

              <Column>
                <Link href="https://twitter.com/tryminimum">
                  <Img
                    src="https://i.ibb.co/2FB0m4m/Twitter.png"
                    alt="Twitter"
                    className="inline h-[14px]"
                  />
                </Link>
              </Column>

              <Column>
                <Link href="https://discord.gg/3pD5UKmtkY">
                  <Img
                    src="https://i.ibb.co/qjR6sqC/Discord.png"
                    alt="Discord"
                    className="inline h-[14px] mx-3"
                  />
                </Link>
              </Column>

              <Column>
                <Link href="https://github.com/minimumapp">
                  <Img
                    src="https://i.ibb.co/T2KKhfQ/Github.png"
                    alt="Github"
                    className="inline h-[14px]"
                  />
                </Link>
              </Column>
            </Row>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default MagicLinkMail;
