export const template = `<div class="tablet:px-3 tablet:pt-3 mobile:px-4 mobile:pt-4 flex flex-col">
	<div class="tablet:flex flex-grow items-center">
		<div class="w-24 h-24 mobile:hidden tablet:block tablet:mr-6">
			<poster class="rounded-sm shadow overflow-hidden"></poster>
		</div>
		<div class="w-full">
			<div class="tablet:block mb-8">
				<show-title class="text-base"></show-title>
				<episode-title class="text-base"></episode-title>
			</div>
			<div class="flex items-center justify-between h-8 my-2">
				<div class="block">
					<play-state on="active">
						<speed-control class="block tablet:block"></speed-control>
					</play-state>
				</div>
				<div class="flex">
					<play-state on="active">
						<chapter-previous class="mx-2 block"></chapter-previous>
					</play-state>
					<play-state on="active">
						<step-backward class="mx-2 block"></step-backward>
					</play-state>

					<play-button class="mx-2 block" label="Podcast episode"></play-button>

					<play-state on="active">
						<step-forward class="mx-2 block"></step-forward>
					</play-state>
					<play-state on="active">
						<chapter-next class="mx-2 block"></chapter-next>
					</play-state>
				</div>

				<div class="block">
					<play-state on="active">
						<volume-control
							class="flex items-center tablet:flex"
						></volume-control>
					</play-state>
				</div>
			</div>
			<div class="flex w-full items-center justify-between">
				<div class="w-min text-left">
					<timer-current class="text-sm"></timer-current>
				</div>
				<div class="w-11/12 mr-2 ml-2">
					<progress-bar class=""></progress-bar>
				</div>
				<div class="w-min text-right">
					<timer-duration class="text-sm"></timer-duration>
				</div>
				<play-state on="active">
					<current-chapter class="text-sm truncate"></current-chapter>
				</play-state>
			</div>
			<!-- <div class="flex w-full -mt-2">
                <div class="w-3/12 text-left">
                    <timer-current class="text-sm"></timer-current>
                </div>
                <div class="w-6/12 text-center">
                    <play-state on="active">
                        <current-chapter class="text-sm truncate"></current-chapter>
                    </play-state>
                </div>
                <div class="w-3/12 text-right">
                    <timer-duration class="text-sm"></timer-duration>
                </div>
            </div> -->
		</div>
	</div>
</div>
<error></error>`;

export default template;