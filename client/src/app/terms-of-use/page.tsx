import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Terms of Use",
    description:
        "This are the terms of use of Birdy. This page is protected by copyright and trademark laws. Please read these terms carefully."
}

export default async function TermsPage() {
    return (
        <section className="mx-auto my-6 flex max-w-5xl flex-col gap-6 px-4 sm:px-0">
            <h1 className="text-center text-4xl font-medium">Terms and Conditions</h1>

            <p>Version 1.0 - April, 10th of 2024.</p>

            <ul id="screen-reader-navigation" className="sr-only" aria-label="SCREEN READER NAVIGATION"></ul>

            <article id="terms-start" className="flex flex-col gap-4">
                <p>Welcome to Birdy!</p>

                <p>
                    These terms and conditions outline the rules and regulations for the use of Birdy&apos;s Website,
                    located at https://birdy-social.vercel.app/.
                </p>

                <p>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use
                    Birdy if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <p>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer
                    Notice and all Agreements: &rsquo;Client&lsquo;, &rsquo;You&lsquo; and &rsquo;Your&lsquo; refers to
                    you, the person log on this website and compliant to the Company&apos;s terms and conditions.
                    &rsquo;The Company&lsquo;, &rsquo;Ourselves&lsquo;, &rsquo;We&lsquo;, &rsquo;Our&lsquo; and
                    &rsquo;Us&lsquo;, refers to our Company. &rsquo;Party&lsquo;, &rsquo;Parties&lsquo;, or
                    &rsquo;Us&lsquo;, refers to both the Client and ourselves. All terms refer to the offer, acceptance
                    and consideration of payment necessary to undertake the process of our assistance to the Client in
                    the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of
                    provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law
                    of br. Any use of the above terminology or other words in the singular, plural, capitalization
                    and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                </p>
            </article>

            <article id="cookies" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Cookies</strong>
                </h2>

                <p>
                    We employ the use of cookies. By accessing Birdy, you agreed to use cookies in agreement with the
                    Birdy&apos;s Privacy Policy.{" "}
                </p>

                <p>
                    Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit.
                    Cookies are used by our website to enable the functionality of certain areas to make it easier for
                    people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                </p>
            </article>

            <article id="license" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>License</strong>
                </h2>

                <p>
                    The developer respects the intellectual property of others and asks that users of our Site do the
                    same. In connection with our Site, we have adopted and implemented a policy respecting copyright law
                    that provides for the removal of any infringing materials and for the termination of users of our
                    online Site who are repeated infringers of intellectual property rights, including copyrights. If
                    you believe that one of our users is, through the use of our Site, unlawfully infringing the
                    copyright(s) in a work, and wish to have the allegedly infringing material removed, the following
                    information must be provided by the contact form such as:
                </p>

                <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
                    <li>your physical or electronic signature;</li>
                    <li>identification of the copyrighted work(s) that you claim to have been infringed;</li>
                    <li>
                        identification of the material on our services that you claim is infringing and that you request
                        us to remove;
                    </li>
                    <li>sufficient information to permit us to locate such material;</li>
                    <li>your address, telephone number, and e-mail address;</li>
                    <li>
                        a statement that you have a good faith belief that use of the objectionable material is not
                        authorized by the copyright owner, its agent, or under the law; and
                    </li>
                    <li>
                        a statement that the information in the notification is accurate, and under penalty of perjury,
                        that you are either the owner of the copyright that has allegedly been infringed or that you are
                        authorized to act on behalf of the copyright owner.
                    </li>
                </ol>

                <p>
                    <strong>Copyright/Trademark Information.</strong> Copyright ©.{" "}
                    <span>{new Date().getFullYear()}</span> João M J Barata Ribeiro - All rights reserved. Permission is
                    hereby granted, free of charge, to any person obtaining a copy of this software and associated
                    documentation files (the “Software”), to deal in the Software without restriction, including without
                    limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
                    the following conditions: The above copyright notice and this permission notice shall be included in
                    all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT
                    WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                    OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                    OTHER DEALINGS IN THE SOFTWARE.
                </p>
            </article>

            <article id="hyperlinking-our-content" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Hyperlinking to our Content</strong>
                </h2>

                <p>The following organizations may link to our Website without prior written approval:</p>

                <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>
                        Online directory distributors may link to our Website in the same manner as they hyperlink to
                        the Websites of other listed businesses; and
                    </li>
                    <li>
                        System wide Accredited Businesses except soliciting non-profit organizations, charity shopping
                        malls, and charity fundraising groups which may not hyperlink to our Web site.
                    </li>
                </ol>

                <p>
                    These organizations may link to our home page, to publications or to other Website information so
                    long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
                    endorsement or approval of the linking party and its products and/or services; and (c) fits within
                    the context of the linking party&apos;s site.
                </p>

                <p>We may consider and approve other link requests from the following types of organizations:</p>

                <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
                    <li>commonly-known consumer and/or business information sources;</li>
                    <li>dot.com community sites;</li>
                    <li>associations or other groups representing charities;</li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                </ol>

                <p>
                    We will approve link requests from these organizations if we decide that: (a) the link would not
                    make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not
                    have any negative records with us; (c) the benefit to us from the visibility of the hyperlink
                    compensates the absence of Birdy; and (d) the link is in the context of general resource
                    information.
                </p>

                <p>
                    These organizations may link to our home page so long as the link: (a) is not in any way deceptive;
                    (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its
                    products or services; and (c) fits within the context of the linking party&apos;s site.
                </p>

                <p>
                    If you are one of the organizations listed in paragraph 2 above and are interested in linking to our
                    website, you must inform us by sending an e-mail to Birdy. Please include your name, your
                    organization name, contact information as well as the URL of your site, a list of any URLs from
                    which you intend to link to our Website, and a list of the URLs on our site to which you would like
                    to link. Wait 2-3 weeks for a response.
                </p>

                <p>Approved organizations may hyperlink to our Website as follows:</p>

                <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
                    <li>By use of our corporate name; or</li>
                    <li>By use of the uniform resource locator being linked to; or</li>
                    <li>
                        By use of any other description of our Website being linked to that makes sense within the
                        context and format of content on the linking party&apos;s site.
                    </li>
                </ol>

                <p>
                    No use of Birdy&apos;s logo or other artwork will be allowed for linking absent a license agreement.
                </p>
            </article>

            <article id="content-liability" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Content Liability</strong>
                </h2>

                <p>
                    We shall not be hold responsible for any content that appears on your Website. You agree to protect
                    and defend us against all claims that is rising on your Website. No link(s) should appear on any
                    Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise
                    violates, or advocates the infringement or other violation of, any third party rights.
                </p>
            </article>

            <article id="reservation-rights" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Reservation of Rights</strong>
                </h2>

                <p>
                    We reserve the right to request that you remove all links or any particular link to our Website. You
                    approve to immediately remove all links to our Website upon request. We also reserve the right to
                    amend these terms and conditions and it&apos;s linking policy at any time. By continuously linking
                    to our Website, you agree to be bound to and follow these linking terms and conditions.
                </p>
            </article>

            <article id="removal-links-our-website" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Removal of links from our website</strong>
                </h2>

                <p>
                    If you find any link on our Website that is offensive for any reason, you are free to contact and
                    inform us any moment. We will consider requests to remove links but we are not obligated to or so or
                    to respond to you directly.
                </p>

                <p>
                    We do not ensure that the information on this website is correct, we do not warrant its completeness
                    or accuracy; nor do we promise to ensure that the website remains available or that the material on
                    the website is kept up to date.
                </p>
            </article>

            <article id="disclaimer" className="flex flex-col gap-4">
                <h2 className="-mb-2 text-2xl">
                    <strong>Disclaimer</strong>
                </h2>

                <p>
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and
                    conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>

                <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>
                        limit any of our or your liabilities in any way that is not permitted under applicable law; or
                    </li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ol>

                <p>
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer:
                    (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the
                    disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                </p>

                <p>
                    As long as the website and the information and services on the website are provided free of charge,
                    we will not be liable for any loss or damage of any nature.
                </p>
            </article>

            <p id="about-privacy-policy">
                <strong className="font-bold">Your Privacy.</strong> Please read our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <a className="sr-only" href="#screen-reader-navigation">
                Go back to navigation
            </a>
        </section>
    )
}
