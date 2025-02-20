import { CardBody, CardContainer, CardItem } from '@/components/global/3d-card'
import { HeroParallax } from '@/components/global/connect-parallax'
import { ContainerScroll } from '@/components/global/container-scroll-animation'
import Navbar from '@/components/global/navbar'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/constant'
import { CheckIcon } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  return (
    <main className="flex items-center justify-center flex-col w-full h-full">
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 bg-gradient-to-br from-black to-neutral-800"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={'lg'}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <Link
                    className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black"
                    href={user ? '/dashboard' : '/sign-in'}
                  >
                    Get Started for Free
                  </Link>
                </Button>
                <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Generate No-Code Automations
                </h1>
              </div>
            }
          />
        </div>
      </section>

      {/* Hero Section */}
      <section id="about">
        <HeroParallax products={products} />
      </section>

      {/* Pricing Section */}
      <section className="flex flex-col items-center justify-center w-full h-full py-16">
        <h1 className="text-5xl font-bold text-neutral-500 dark:text-white">
          Plans that fit your needs
        </h1>
      </section>

      <section>
        <div id="pricing" className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 mb-24">
          {/* Card for Free Plan */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                Free
                <h2 className="text-6xl ">$0</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Free automations for everyone. Get a glimpse of what our software is capable of!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />10 Free automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    10 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={user ? '/dashboard' : '/sign-in'}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card for Pro Plan */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-[#E2CBFF] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                Pro
                <h2 className="text-6xl ">$29</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                100 tasks per month. Get a glimpse of what our software is capable of. Just a heads up you'll never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />100 automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    100 tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={user ? '/dashboard' : '/sign-in'}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card for Unlimited Plan */}
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                Unlimited
                <h2 className="text-6xl ">$99</h2>
              </CardItem>
              <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Unlimited tasks per month. Automate everything with our software. Business automation at its best!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />Unlimited automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Unlimited tasks per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  <Link href={user ? '/dashboard' : '/sign-in'}>Get Started Now</Link>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-center w-full h-24 bg-white dark:bg-black">
        <Link href="https://arslankamchybekov.com" className="text-black dark:text-white">
          © 2025 automata. All rights reserved. Built by Arslan Kamchybekov
        </Link>
      </footer>
    </main>
  )
}
