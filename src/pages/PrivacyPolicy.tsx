import Head from "../components/helpers/Head";

const PrivacyPolicy = () => {
	return (
		<section className="mx-auto my-6 flex max-w-5xl flex-col gap-6 px-4 sm:px-0">
			<Head
				title="Privacy Policy"
				description="This is the privacy policy of our site. As a user of our site, you must ensure that you read the privacy policy and understand how we store, use, and/or maintain your information."
			/>
			<h1 className="text-center text-4xl font-medium">
				Privacy Policy for Birdy
			</h1>

			<p>Version 1.0 - October, 22st of 2023.</p>

			<ul
				id="screen-reader-navigation"
				className="sr-only"
				aria-label="SCREEN READER NAVIGATION"
				role="privacy policy navigation"
			>
				<li>
					<a href="#privacy-start">Privacy Policy Start</a>
				</li>
				<li>
					<a href="#consent">Consent</a>
				</li>
				<li>
					<a href="#information-we-collect">Information we collect</a>
				</li>
				<li>
					<a href="#how-we-use-information">How we use your information</a>
				</li>
				<li>
					<a href="#log-files">Log Files</a>
				</li>
				<li>
					<a href="#cookies-and-beacons">Cookies and Web Beacons</a>
				</li>
				<li>
					<a href="#ads-partners">Advertising Partners Privacy Policies</a>
				</li>
				<li>
					<a href="#third-party-privacy-policies">
						Third Party Privacy Policies
					</a>
				</li>
				<li>
					<a href="#CCPA-rights">CCPA Privacy Rights</a>
				</li>
				<li>
					<a href="#GDPR-protection">GDPR Data Protection Rights</a>
				</li>
				<li>
					<a href="#children-information">Children's Information</a>
				</li>
				<li>
					<a href="#changes-to-policy">Changes to This Privacy Policy</a>
				</li>
				<li>
					<a href="#contact-us">Contact Us</a>
				</li>
			</ul>

			<article id="privacy-start" className="flex flex-col gap-4">
				<p>
					At Birdy, accessible from [PLACEHOLDER] one of our main priorities is
					the privacy of our visitors. This Privacy Policy document contains
					types of information that is collected and recorded by Birdy and how
					we use it.
				</p>

				<p>
					If you have additional questions or require more information about our
					Privacy Policy, do not hesitate to contact us.
				</p>

				<p>
					This Privacy Policy applies only to our online activities and is valid
					for visitors to our website with regards to the information that they
					shared and/or collect in Birdy. This policy is not applicable to any
					information collected offline or via channels other than this website.
				</p>
			</article>

			<article id="consent" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Consent</h2>

				<p>
					By using our website, you hereby consent to our Privacy Policy and
					agree to its terms.
				</p>
			</article>

			<article id="information-we-collect" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Information we collect</h2>

				<p>
					The personal information that you are asked to provide, and the
					reasons why you are asked to provide it, will be made clear to you at
					the point we ask you to provide your personal information.
				</p>
				<p>
					If you contact us directly, we may receive additional information
					about you such as your name, email address, phone number, the contents
					of the message and/or attachments you may send us, and any other
					information you may choose to provide.
				</p>
				<p>
					When you register for an Account, we may ask for your information,
					which are: (a) your email address; (b) your username; (c) a password
					for your access;
				</p>
			</article>

			<article id="how-we-use-information" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">How we use your information</h2>

				<p>We use the information we collect in various ways, including to:</p>

				<ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
					<li>Provide, operate, and maintain our website</li>
					<li>Improve, personalize, and expand our website</li>
					<li>Understand and analyze how you use our website</li>
					<li>Develop new products, services, features, and functionality</li>
					<li>
						Communicate with you for customer service to provide you with
						updates and other information relating to the website, but never for
						marketing or promotional purposes since this is an open-source
						project with academic purposes.
					</li>
					<li>Send you emails</li>
				</ol>
			</article>

			<article id="log-files" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Log Files</h2>

				<p>
					The Birdy API does not collect any information aside from cookies,
					where your access is stored for complete and seamless access to the
					services, and the information you provide during the Sign-Up process,
					or when you edit your account. We do not log when you access the
					website or from where, only when your account was created, and or
					edited.
				</p>
			</article>

			<article id="cookies-and-beacons" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Cookies and Web Beacons</h2>

				<p>
					Like any other website, Birdy uses "cookies". These cookies are used
					to store information that might include visitors' preferences and the
					pages on the website that the visitor accessed or visited. But mainly
					to store the user's access information that is required for a seamless
					and instant navigation after one has logged in.
				</p>
			</article>

			<article id="ads-partners" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">
					Advertising Partners Privacy Policies
				</h2>

				<p>
					You may consult this list to find the Privacy Policy for each of the
					advertising partners of Birdy if we ever have one.
				</p>

				<p>
					Third-party ad servers or ad networks use technologies like cookies,
					JavaScript, or Web Beacons used in their respective advertisements and
					links that appear on Birdy, sent directly to users' browsers. They
					automatically receive your IP address when this occurs. These
					technologies are used to measure the effectiveness of their
					advertising campaigns and/or personalize the advertising content you
					see on websites you visit.
				</p>

				<p>
					Note that Birdy currently does not provide any advertisements, but if
					doing it so, it has no access to or control over these cookies that
					are used by third-party advertisers.
				</p>
			</article>

			<article
				id="third-party-privacy-policies"
				className="flex flex-col gap-4"
			>
				<h2 className="-mb-2 text-2xl">Third Party Privacy Policies</h2>

				<p>
					Birdy's Privacy Policy does not apply to other advertisers or websites
					that are here linked. Thus, we are advising you to consult the
					respective Privacy Policies of these third-party ad servers and/or of
					the third-party links, for more detailed information. It may include
					their practices and instructions about how to opt-out of certain
					options.
				</p>

				<p>
					You can choose to disable cookies through your browser options. To
					know more detailed information about cookie management with specific
					web browsers, it can be found at the browsers' respective websites.
					But be aware that because essential information is stored in those
					cookies, it may change how you navigate the website.
				</p>
			</article>

			<article id="CCPA-rights" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">
					CCPA Privacy Rights (Do Not Sell My Personal Information)
				</h2>

				<p>
					Under the CCPA, among other rights, California consumers have the
					right to:
				</p>
				<p>
					Request that a business that collects a consumer's personal data
					disclose the categories and specific pieces of personal data that a
					business has collected about consumers.
				</p>
				<p>
					Request that a business delete any personal data about the consumer
					that a business has collected.
				</p>
				<p>
					Request that a business that sells a consumer's personal data, not
					sell the consumer's personal data.
				</p>
				<p>
					If you make a request, we have one month to respond to you. If you
					would like to exercise any of these rights, please contact us.
				</p>
			</article>

			<article id="GDPR-protection" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">GDPR Data Protection Rights</h2>

				<p>
					We would like to make sure you are fully aware of all of your data
					protection rights. Every user is entitled to the following:
				</p>
				<p>
					The right to access - You have the right to request copies of your
					personal data. We may charge you a small fee for this service.
				</p>
				<p>
					The right to rectification - You have the right to request that we
					correct any information you believe is inaccurate. You also have the
					right to request that we complete the information you believe is
					incomplete. Although, we the exception of your e-mail address, all
					your information can be easily edited through your account dashboard.
				</p>
				<p>
					The right to erasure - You have the right to request that we erase
					your data. But be aware that, if you still have access to your
					account, the deletion of your account is accessed through your account
					dashboard, and the action is permanent and complete, with no way of
					reversion—all data is excluded from the database.
				</p>
				<p>
					The right to restrict processing - You have the right to request that
					we restrict the processing of your personal data, under certain
					conditions.
				</p>
				<p>
					The right to object to processing - You have the right to object to
					our processing of your personal data, under certain conditions.
				</p>
				<p>
					The right to data portability - You have the right to request that we
					transfer the data that we have collected to another organization, or
					directly to you, under certain conditions.
				</p>
				<p>
					If you make a request, we have one month to respond to you. If you
					would like to exercise any of these rights, please contact us.
				</p>
			</article>

			<article id="children-information" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Children's Information</h2>

				<p>
					Another part of our priority is adding protection for children while
					using the internet. We encourage parents and guardians to observe,
					participate in, and/or monitor and guide their online activity.
				</p>

				<p>
					Birdy does not knowingly collect any Personal Identifiable Information
					from children under the age of 18. If you think that your child
					provided this kind of information on our website, we strongly
					encourage you to contact us immediately and we will do our best
					efforts to promptly remove such information from our records.{" "}
				</p>

				<strong>
					THIS WEBSITE DOES NOT PROVIDE ITS SERVICES TO INDIVIDUALS UNDER THE
					AGE OF 18! IF WE SUSPECT YOU'RE A MINOR, WE WILL TERMINATE YOUR
					ACCOUNT IMMIDEATLY! (By terminate, we mean complete deletion).
				</strong>
			</article>

			<article id="changes-to-policy" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Changes to This Privacy Policy</h2>

				<p>
					We may update our Privacy Policy from time to time. Thus, we advise
					you to review this page periodically for any changes. We won't notify
					you of any changes in the Privacy Policy either through e-mail or on
					this page. These changes are effective immediately, after they are
					posted on this page. You will know when a change is made because of
					the use of the tag (new), which is optional from our end, and the
					change in the date at the beginning of this article.
				</p>

				<p>
					Our Privacy Policy was created with the help of the{" "}
					<a href="https://www.termsfeed.com/privacy-policy-generator/">
						Privacy Policy Generator
					</a>
					.
				</p>
			</article>

			<article id="contact-us" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Contact Us</h2>

				<p>
					If you have any questions or suggestions about our Privacy Policy, do
					not hesitate to contact us. You can do that through our 'Contact' page
					in the navigation menu.
				</p>
			</article>

			<a className="sr-only" href="#screen-reader-navigation">
				Go back to navigation
			</a>
		</section>
	);
};

export default PrivacyPolicy;
