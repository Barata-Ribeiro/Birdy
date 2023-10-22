import { Link } from "react-router-dom";

import Head from "../components/helpers/Head";

const TermsOfUse = () => {
	return (
		<section className="mx-auto my-6 flex max-w-5xl flex-col gap-6 px-4 sm:px-0">
			<Head
				title="Terms of Use"
				description="This are the terms of use of Birdy. This page is protected by copyright and trademark laws. Please read these terms carefully."
			/>
			<h1 className="text-center text-4xl font-medium">Website Terms of Use</h1>

			<p>Version 1.0 - October, 21st of 2023.</p>

			<ul
				id="screen-reader-navigation"
				className="sr-only"
				aria-label="SCREEN READER NAVIGATION"
				role="terms navigation"
			>
				<li>
					<a href="#terms-start">Terms Start</a>
				</li>
				<li>
					<a href="#access-to-the-site">Access to the Site</a>
				</li>
				<li>
					<a href="#user-content">User Content</a>
				</li>
				<li>
					<a href="#third-party-links">Third-Party Links & Ads; Other Users</a>
				</li>
				<li>
					<a href="#disclaimer">Disclaimer</a>
				</li>
				<li>
					<a href="#limitation-on-liability">Limitation on Liability</a>
				</li>
				<li>
					<a href="#copyright-policy">Copyright Policy</a>
				</li>
				<li>
					<a href="#general">General Terms</a>
				</li>
				<li>
					<a href="#about-privacy-policy">Privacy Policy</a>
				</li>
				<li>
					<a href="#copyright-information">Copyright Information</a>
				</li>
			</ul>

			<article id="terms-start" className="flex flex-col gap-4">
				<p>
					The Birdy social network website located at [PLACEHOLDER] is a
					software developer by Barata Ribeiro under the MIT license. Certain
					features of the Site may be subject to additional guidelines, terms,
					or rules, which will be posted on the Site in connection with such
					features.
				</p>

				<p>
					All such additional terms, guidelines, and rules are incorporated by
					reference into these Terms.
				</p>

				<p>
					These Terms of Use described the legally binding terms and conditions
					that oversee your use of the Site. BY LOGGING INTO THE SITE, YOU ARE
					BEING COMPLIANT THAT THESE TERMS and you represent that you have the
					authority and capacity to enter into these Terms. YOU SHOULD BE AT
					LEAST 18 YEARS OF AGE TO ACCESS THE SITE. IF YOU DISAGREE WITH ALL OF
					THE PROVISION OF THESE TERMS, DO NOT LOG INTO AND/OR USE THE SITE.
				</p>

				<p>
					These terms require the use of arbitration Section 10.2 on an
					individual basis to resolve disputes and also limit the remedies
					available to you in the event of a dispute.
				</p>
			</article>

			<article id="access-to-the-site" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Access to the Site</h2>

				<p>
					<strong>Subject to these Terms.</strong> The developer grants you a
					non-transferable, non-exclusive, revocable, limited license to access
					the Site solely for your own personal, noncommercial use.
				</p>

				<p>
					<strong>Certain Restrictions.</strong> The rights approved to you in
					these Terms are subject to the following restrictions: (a) you shall
					not sell, rent, lease, transfer, assign, distribute, host, or
					otherwise commercially exploit the Site unless you have made
					appropriate changes limited to the MIT license; (b) you are limited to
					the MIT license if you want to change, make derivative works of,
					disassemble, reverse compile or reverse engineer any part of the Site;
					(c) you are limited to the MIT license if you want to access the Site
					in order to build a similar or competitive website; and (d) except as
					expressly stated herein, no part of the Site may be copied,
					reproduced, distributed, republished, downloaded, displayed, posted,
					or transmitted in any form or by any means if you intend to cause harm
					or commit a crime anywhere, anywhere. All copyright and other
					proprietary notices on the Site must be retained on all copies
					thereof.
				</p>

				<p>
					The developer reserves the right to change, suspend, or cease the Site
					with or without notice to you. You approved that the developer will
					not be held liable to you or any third-party for any change,
					interruption, or termination of the Site or any part.
				</p>

				<p>
					<strong>No Support or Maintenance.</strong> You agree that the
					developer will have no obligation to provide you with any support in
					connection with the Site. This is an open-source project under the MIT
					license.
				</p>

				<p>
					Excluding any User Content that you may provide, that are expected to
					be of your own creation, you are aware that all the intellectual
					property rights, including copyrights, patents, trademarks, in the
					Site and its content are owned by the developer, Barata Ribeiro, but
					are all under the MIT license. Note that these Terms and access to the
					Site do not give you any rights, title or interest in or to any
					intellectual property rights, outside of the scope of this Site and
					the MIT license.
				</p>
			</article>

			<article id="user-content" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">User Content</h2>

				<p>
					<strong>User Content.</strong> "User Content" means any and all
					information and content that a user submits to the Site. You are
					exclusively responsible for your User Content, that is (a) Photos you
					post; (b) Comments you post; (c) Likes your give. You bear all risks
					associated with use of your User Content. You hereby certify that your
					User Content does not violate our Acceptable Use Policy. You may not
					represent or imply to others that your User Content is in any way
					provided, sponsored or endorsed by the developer, Barata Ribeiro.
					Because you alone are responsible for your User Content, you may
					expose yourself to liability. The developer is not obliged to backup
					any User Content that you post; also, your User Content may be deleted
					at any time without prior notice to you. You are solely responsible
					for making your own backup copies of your User Content if you desire.
				</p>

				<p>
					You hereby grant to the developer an irreversible, nonexclusive,
					royalty-free and fully paid, worldwide license to reproduce,
					distribute, publicly display and perform, prepare derivative works of,
					incorporate into other works, and otherwise use and exploit your User
					Content, and to grant sublicenses of the foregoing rights, solely for
					the purposes of including your User Content in the Site. You hereby
					irreversibly waive any claims and assertions of moral rights or
					attribution with respect to your User Content.
				</p>

				<p>
					<strong>Acceptable Use Policy.</strong> The following terms constitute
					our "Acceptable Use Policy": You agree not to use the Site to collect,
					upload, transmit, display, or distribute any User Content (i) that
					violates any third-party right or any intellectual property or
					proprietary right; (ii) that is unlawful, harassing, abusive,
					tortious, threatening, harmful, invasive of another's privacy, vulgar,
					defamatory, false, intentionally misleading, trade libelous,
					pornographic, obscene, patently offensive, promotes racism, bigotry,
					hatred, or physical harm of any kind against any group or individual;
					(iii) that is harmful to minors in any way; or (iv) that is in
					violation of any law, regulation, or obligations or restrictions
					imposed by any third party.
				</p>

				<p>
					In addition, you agree not to: (i) upload, transmit, or distribute to
					or through the Site any software intended to damage or alter a
					computer system or data; (ii) send through the Site unsolicited or
					unauthorized advertising, promotional materials, junk mail, spam,
					chain letters, pyramid schemes, or any other form of duplicative or
					unsolicited messages; (iii) use the Site to harvest, collect, gather
					or assemble information or data regarding other users without their
					consent; (iv) interfere with, disrupt, or create an undue burden on
					servers or networks connected to the Site, or violate the regulations,
					policies or procedures of such networks; (v) attempt to gain
					unauthorized access to the Site, whether through password mining or
					any other means; (vi) harass or interfere with any other user's use
					and enjoyment of the Site; or (vi) use software or automated agents or
					scripts to produce multiple accounts on the Site, or to generate
					automated searches, requests, or queries to the Site.
				</p>

				<p>
					We reserve the right to review any User Content, and to investigate
					and/or take appropriate action against you in our sole discretion if
					you violate the Acceptable Use Policy or any other provision of these
					Terms or otherwise create liability for us or any other person. Such
					action may include removing or modifying your User Content,
					terminating your Account, and/or reporting you to law enforcement
					authorities.
				</p>

				<p>
					If you provide the developer with any feedback or suggestions
					regarding the Site, you must do it so per the MIT license, and it is
					entitled to reference of your work. All feedback must be provided
					through the Site's repository on GitHub, on the 'Issues' page. There
					are no guarantees that your feedback will be implemented.
				</p>

				<p>
					You agree to indemnify and hold the developer and its officers,
					employees, and agents harmless, including costs and attorneys' fees,
					from any claim or demand made by any third-party due to or arising out
					of (a) your use of the Site, (b) your violation of these Terms, (c)
					your violation of applicable laws or regulations or (d) your User
					Content. The developer, Barata Ribeiro, reserves the right to assume
					the exclusive defense and control of any matter for which you are
					required to indemnify us, and you agree to cooperate with our defense
					of these claims. You agree not to settle any matter without the prior
					written consent of the developer. Barata Ribeiro, and its associates,
					will use reasonable efforts to notify you of any such claim, action or
					proceeding upon becoming aware of it.
				</p>
			</article>

			<article id="third-party-links" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Third-Party Links & Ads; Other Users</h2>

				<p>
					<strong>Third-Party Links & Ads.</strong> The Site may contain links
					to third-party websites and services, and/or display advertisements
					for third-parties. Such Third-Party Links & Ads are not under the
					control of the developer, and he is not responsible for any
					Third-Party Links & Ads. that he provides access to these Third-Party
					Links & Ads only as a convenience to you, and does not review,
					approve, monitor, endorse, warrant, or make any representations with
					respect to Third-Party Links & Ads. You use all Third-Party Links &
					Ads at your own risk, and should apply a suitable level of caution and
					discretion in doing so. When you click on any of the Third-Party Links
					& Ads, the applicable third party's terms and policies apply,
					including the third party's privacy and data gathering practices.
				</p>

				<p>
					<strong>Other Users.</strong> Each Site user is solely responsible for
					any and all of its own User Content. Because we do not control User
					Content, you acknowledge and agree that we are not responsible for any
					User Content, whether provided by you or by others. You agree that the
					developer, Barata Ribeiro, and its associates will not be responsible
					for any loss or damage incurred as the result of any such
					interactions. If there is a dispute between you and any Site user, we
					are under no obligation to become involved.
				</p>

				<p>
					You hereby release and forever discharge the the developer and our
					officers, employees, agents, successors, and assigns from, and hereby
					waive and relinquish, each and every past, present and future dispute,
					claim, controversy, demand, right, obligation, liability, action and
					cause of action of every kind and nature, that has arisen or arises
					directly or indirectly out of, or that relates directly or indirectly
					to, the Site. If you are a California resident, you hereby waive
					California civil code section 1542 in connection with the foregoing,
					which states: "a general release does not extend to claims which the
					creditor does not know or suspect to exist in his or her favor at the
					time of executing the release, which if known by him or her must have
					materially affected his or her settlement with the debtor."
				</p>

				<p>
					<strong>Cookies and Web Beacons.</strong> Like any other website,
					Birdy uses 'cookies'. These cookies are used to store certain pieces
					of information that can include the visitors' preferences and the
					pages on the website that the visitor accessed or visited. As well as
					specific credentials related to your User Account if you choose to
					create one. The information is used for academic purposes only.
				</p>
			</article>

			<article id="disclaimer" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Disclaimers</h2>

				<p>
					The site is provided on an "as-is" and "as available" basis, and the
					developer and its associates expressly disclaim any and all warranties
					and conditions of any kind, whether express, implied, or statutory,
					including all warranties or conditions of merchantability, fitness for
					a particular purpose, title, quiet enjoyment, accuracy, or
					non-infringement. We and its associates make not guarantee that the
					site will meet your requirements, will be available on an
					uninterrupted, timely, secure, or error-free basis, or will be
					accurate, reliable, free of viruses or other harmful code, complete,
					legal, or safe. If applicable law requires any warranties with respect
					to the site, all such warranties are limited in duration to ninety
					(90) days from the date of first use.
				</p>

				<p>
					Some jurisdictions do not allow the exclusion of implied warranties,
					so the above exclusion may not apply to you. Some jurisdictions do not
					allow limitations on how long an implied warranty lasts, so the above
					limitation may not apply to you.
				</p>
			</article>

			<article id="limitation-on-liability" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Limitation on Liability</h2>

				<p>
					To the maximum extent permitted by law, in no event shall the
					developer or its associates be liable to you or any third-party for
					any lost profits, lost data, costs of procurement of substitute
					products, or any indirect, consequential, exemplary, incidental,
					special or punitive damages arising from or relating to these terms or
					your use of, or incapability to use the site even if the developer has
					been advised of the possibility of such damages. Access to and use of
					the site is at your own discretion and risk, and you will be solely
					responsible for any damage to your device or computer system, or loss
					of data resulting therefrom.
				</p>

				<p>
					To the maximum extent permitted by law, notwithstanding anything to
					the contrary contained herein, our liability to you for any damages
					arising from or related to this agreement, will at all times be
					limited to a maximum of fifty U.S. dollars (u.s. $50). The existence
					of more than one claim will not enlarge this limit. You agree that its
					associates will have no liability of any kind arising from or relating
					to this agreement.
				</p>

				<p>
					Some jurisdictions do not allow the limitation or exclusion of
					liability for incidental or consequential damages, so the above
					limitation or exclusion may not apply to you.
				</p>

				<p>
					<strong>Term and Termination.</strong> Subject to this Section, these
					Terms will remain in full force and effect while you use the Site. We
					may suspend or terminate your rights to use the Site at any time for
					any reason at our sole discretion, including for any use of the Site
					in violation of these Terms. Upon termination of your rights under
					these Terms, your Account and right to access and use the Site will
					terminate immediately. You understand that any termination of your
					Account may involve deletion of your User Content associated with your
					Account from our live databases. The developer will not have any
					liability whatsoever to you for any termination of your rights under
					these Terms.
				</p>
			</article>

			<article id="copyright-policy" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">Copyright Policy.</h2>

				<p>
					The developer respects the intellectual property of others and asks
					that users of our Site do the same. In connection with our Site, we
					have adopted and implemented a policy respecting copyright law that
					provides for the removal of any infringing materials and for the
					termination of users of our online Site who are repeated infringers of
					intellectual property rights, including copyrights. If you believe
					that one of our users is, through the use of our Site, unlawfully
					infringing the copyright(s) in a work, and wish to have the allegedly
					infringing material removed, the following information in the form of
					a written notification (pursuant to 17 U.S.C. § 512(c)) must be
					provided:
				</p>

				<ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
					<li>your physical or electronic signature;</li>
					<li>
						identification of the copyrighted work(s) that you claim to have
						been infringed;
					</li>
					<li>
						identification of the material on our services that you claim is
						infringing and that you request us to remove;
					</li>
					<li>sufficient information to permit us to locate such material;</li>
					<li>your address, telephone number, and e-mail address;</li>
					<li>
						a statement that you have a good faith belief that use of the
						objectionable material is not authorized by the copyright owner, its
						agent, or under the law; and
					</li>
					<li>
						a statement that the information in the notification is accurate,
						and under penalty of perjury, that you are either the owner of the
						copyright that has allegedly been infringed or that you are
						authorized to act on behalf of the copyright owner.
					</li>
				</ol>

				<p>
					Please note that, pursuant to 17 U.S.C. § 512(f), any
					misrepresentation of material fact in a written notification
					automatically subjects the complaining party to liability for any
					damages, costs and attorney's fees incurred by us in connection with
					the written notification and allegation of copyright infringement.
				</p>
			</article>

			<article id="general" className="flex flex-col gap-4">
				<h2 className="-mb-2 text-2xl">General</h2>

				<p>
					These Terms are subject to occasional revision, and if we make any
					substantial changes, we may notify you by sending you an e-mail to the
					last e-mail address you provided to us and/or by prominently posting
					notice of the changes on our Site. You are responsible for providing
					us with your most current e-mail address. In the event that the last
					e-mail address that you have provided us is not valid our dispatch of
					the e-mail containing such notice will nonetheless constitute
					effective notice of the changes described in the notice. Any changes
					to these Terms will be effective upon the earliest of thirty (30)
					calendar days following our posting of notice of the changes on our
					Site. These changes will be effective immediately for new users of our
					Site. Continued use of our Site following notice of such changes shall
					indicate your acknowledgement of such changes and agreement to be
					bound by the terms and conditions of such changes. Dispute Resolution.
					Please read this Arbitration Agreement carefully. It is part of your
					contract with the developer and affects your rights. It contains
					procedures for MANDATORY BINDING ARBITRATION AND A CLASS ACTION
					WAIVER.
				</p>

				<p>
					<strong>Applicability of Arbitration Agreement.</strong> All claims
					and disputes in connection with the Terms or the use of any product or
					service provided by the the developer that cannot be resolved
					informally or in small claims court shall be resolved by binding
					arbitration on an individual basis under the terms of this Arbitration
					Agreement. Unless otherwise agreed to, all arbitration proceedings
					shall be held in English. This Arbitration Agreement applies to you
					and the the developer, and to any subsidiaries, affiliates, agents,
					employees, predecessors in interest, successors, and assigns, as well
					as all authorized or unauthorized users or beneficiaries of services
					or goods provided under the Terms.
				</p>

				<p>
					<strong>Notice Requirement and Informal Dispute Resolution.</strong>{" "}
					Before either party may seek arbitration, the party must first send to
					the other party a written Notice of Dispute describing the nature and
					basis of the claim or dispute, and the requested relief. A Notice to
					the the developer should be sent through the Site's contact form.
					After the Notice is received, you and the the developer may attempt to
					resolve the claim or dispute informally. If you and the the developer
					do not resolve the claim or dispute within thirty (30) days after the
					Notice is received, either party may begin an arbitration proceeding.
					The amount of any settlement offer made by any party may not be
					disclosed to the arbitrator until after the arbitrator has determined
					the amount of the award to which either party is entitled.
				</p>

				<p>
					<strong>Arbitration Rules.</strong> Arbitration shall be initiated
					through the American Arbitration Association, an established
					alternative dispute resolution provider that offers arbitration as set
					forth in this section. If AAA is not available to arbitrate, the
					parties shall agree to select an alternative ADR Provider. The rules
					of the ADR Provider shall govern all aspects of the arbitration except
					to the extent such rules are in conflict with the Terms. The AAA
					Consumer Arbitration Rules governing the arbitration are available
					online at adr.org or by calling the AAA at 1-800-778-7879. The
					arbitration shall be conducted by a single, neutral arbitrator. Any
					claims or disputes where the total amount of the award sought is less
					than Ten Thousand U.S. Dollars (US $10,000.00) may be resolved through
					binding non-appearance-based arbitration, at the option of the party
					seeking relief. For claims or disputes where the total amount of the
					award sought is Ten Thousand U.S. Dollars (US $10,000.00) or more, the
					right to a hearing will be determined by the Arbitration Rules. Any
					hearing will be held in a location within 100 miles of your residence,
					unless you reside outside of the United States, and unless the parties
					agree otherwise. If you reside outside of the U.S., the arbitrator
					shall give the parties reasonable notice of the date, time and place
					of any oral hearings. Any judgment on the award rendered by the
					arbitrator may be entered in any court of competent jurisdiction. If
					the arbitrator grants you an award that is greater than the last
					settlement offer that the the developer made to you prior to the
					initiation of arbitration, the the developer will pay you the greater
					of the award or $2,500.00. Each party shall bear its own costs and
					disbursements arising out of the arbitration and shall pay an equal
					share of the fees and costs of the ADR Provider.
				</p>

				<p>
					<strong>
						Additional Rules for Non-Appearance Based Arbitration.
					</strong>{" "}
					If non-appearance based arbitration is elected, the arbitration shall
					be conducted by telephone, online and/or based solely on written
					submissions; the specific manner shall be chosen by the party
					initiating the arbitration. The arbitration shall not involve any
					personal appearance by the parties or witnesses unless otherwise
					agreed by the parties.
				</p>

				<p>
					<strong>Time Limits.</strong> If you or the the developer pursues
					arbitration, the arbitration action must be initiated and/or demanded
					within the statute of limitations and within any deadline imposed
					under the AAA Rules for the pertinent claim.
				</p>

				<p>
					<strong>Authority of Arbitrator.</strong> If arbitration is initiated,
					the arbitrator will decide the rights and liabilities of you and the
					the developer, and the dispute will not be consolidated with any other
					matters or joined with any other cases or parties. The arbitrator
					shall have the authority to grant motions dispositive of all or part
					of any claim. The arbitrator shall have the authority to award
					monetary damages, and to grant any non-monetary remedy or relief
					available to an individual under applicable law, the AAA Rules, and
					the Terms. The arbitrator shall issue a written award and statement of
					decision describing the essential findings and conclusions on which
					the award is based. The arbitrator has the same authority to award
					relief on an individual basis that a judge in a court of law would
					have. The award of the arbitrator is final and binding upon you and
					the the developer.
				</p>

				<p>
					<strong>Waiver of Jury Trial.</strong> THE PARTIES HEREBY WAIVE THEIR
					CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN
					FRONT OF A JUDGE OR A JURY, instead electing that all claims and
					disputes shall be resolved by arbitration under this Arbitration
					Agreement. Arbitration procedures are typically more limited, more
					efficient and less expensive than rules applicable in a court and are
					subject to very limited review by a court. In the event any litigation
					should arise between you and the the developer in any state or federal
					court in a suit to vacate or enforce an arbitration award or
					otherwise, YOU AND THE THE DEVELOPER WAIVE ALL RIGHTS TO A JURY TRIAL,
					instead electing that the dispute be resolved by a judge.
				</p>

				<p>
					<strong>Waiver of Class or Consolidated Actions.</strong> All claims
					and disputes within the scope of this arbitration agreement must be
					arbitrated or litigated on an individual basis and not on a class
					basis, and claims of more than one customer or user cannot be
					arbitrated or litigated jointly or consolidated with those of any
					other customer or user.
				</p>

				<p>
					<strong>Confidentiality.</strong> All aspects of the arbitration
					proceeding shall be strictly confidential. The parties agree to
					maintain confidentiality unless otherwise required by law. This
					paragraph shall not prevent a party from submitting to a court of law
					any information necessary to enforce this Agreement, to enforce an
					arbitration award, or to seek injunctive or equitable relief.
				</p>

				<p>
					<strong>Severability.</strong> If any part or parts of this
					Arbitration Agreement are found under the law to be invalid or
					unenforceable by a court of competent jurisdiction, then such specific
					part or parts shall be of no force and effect and shall be severed and
					the remainder of the Agreement shall continue in full force and
					effect.
				</p>

				<p>
					<strong>Right to Waive.</strong> Any or all of the rights and
					limitations set forth in this Arbitration Agreement may be waived by
					the party against whom the claim is asserted. Such waiver shall not
					waive or affect any other portion of this Arbitration Agreement.
				</p>

				<p>
					<strong>Survival of Agreement.</strong> This Arbitration Agreement
					will survive the termination of your relationship with the developer.
				</p>

				<p>
					<strong>Small Claims Court.</strong> Nonetheless the foregoing, either
					you or the developer may bring an individual action in small claims
					court.
				</p>

				<p>
					<strong>Emergency Equitable Relief.</strong> Anyhow the foregoing,
					either party may seek emergency equitable relief before a state or
					federal court in order to maintain the status quo pending arbitration.
					A request for interim measures shall not be deemed a waiver of any
					other rights or obligations under this Arbitration Agreement.
				</p>

				<p>
					<strong>Claims Not Subject to Arbitration.</strong> Notwithstanding
					the foregoing, claims of defamation, violation of the Computer Fraud
					and Abuse Act, and infringement or misappropriation of the other
					party's patent, copyright, trademark or trade secrets shall not be
					subject to this Arbitration Agreement.
				</p>

				<p>
					In any circumstances where the foregoing Arbitration Agreement permits
					the parties to litigate in court, the parties hereby agree to submit
					to the personal jurisdiction of the courts located within br County,
					California, for such purposes.
				</p>

				<p>
					The Site may be subject to U.S. export control laws and may be subject
					to export or import regulations in other countries. You agree not to
					export, re-export, or transfer, directly or indirectly, any U.S.
					technical data acquired from the developer, or any products utilizing
					such data, in violation of the United States export laws or
					regulations.
				</p>

				<p>
					<strong>Electronic Communications.</strong> The communications between
					you and the developer use electronic means, whether you use the Site
					or send us emails, or whether the developer posts notices on the Site
					or communicates with you via email. For contractual purposes, you (a)
					consent to receive communications from the developer in an electronic
					form; and (b) agree that all terms and conditions, agreements,
					notices, disclosures, and other communications that the developer
					provides to you electronically satisfy any legal obligation that such
					communications would satisfy if it were be in a hard copy writing.
				</p>

				<p>
					<strong>Entire Terms.</strong> These Terms constitute the entire
					agreement between you and us regarding the use of the Site. Our
					failure to exercise or enforce any right or provision of these Terms
					shall not operate as a waiver of such right or provision. The section
					titles in these Terms are for convenience only and have no legal or
					contractual effect. The word "including" means "including without
					limitation". If any provision of these Terms is held to be invalid or
					unenforceable, the other provisions of these Terms will be unimpaired
					and the invalid or unenforceable provision will be deemed modified so
					that it is valid and enforceable to the maximum extent permitted by
					law. Your relationship to Company is that of an independent
					contractor, and neither party is an agent or partner of the other.
					These Terms, and your rights and obligations herein, may not be
					assigned, subcontracted, delegated, or otherwise transferred by you
					without Company's prior written consent, and any attempted assignment,
					subcontract, delegation, or transfer in violation of the foregoing
					will be null and void. Company may freely assign these Terms. The
					terms and conditions set forth in these Terms shall be binding upon
					assignees.
				</p>
			</article>

			<p id="about-privacy-policy">
				<strong>Your Privacy.</strong> Please read our{" "}
				<Link to={"/privacy-policy"}>Privacy Policy</Link>.
			</p>

			<p id="copyright-information">
				<strong>Copyright/Trademark Information.</strong> Copyright ©.{" "}
				<span>{new Date().getFullYear()}</span> João M J Barata Ribeiro - All
				rights reserved. Permission is hereby granted, free of charge, to any
				person obtaining a copy of this software and associated documentation
				files (the “Software”), to deal in the Software without restriction,
				including without limitation the rights to use, copy, modify, merge,
				publish, distribute, sublicense, and/or sell copies of the Software, and
				to permit persons to whom the Software is furnished to do so, subject to
				the following conditions: The above copyright notice and this permission
				notice shall be included in all copies or substantial portions of the
				Software. THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY
				KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
				MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
				IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
				CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
				TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
				SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
			</p>

			<a className="sr-only" href="#screen-reader-navigation">
				Go back to navigation
			</a>
		</section>
	);
};

export default TermsOfUse;
