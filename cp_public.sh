#!/bin/bash

rsync src/components/PodcastPlayer/podloveTemplate.html public
rsync api-spec.yaml public
rsync node_modules/@podlove/web-player/embed.js public/podlove.js
rsync -a icons public/