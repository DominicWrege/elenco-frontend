#!/bin/bash

out=public

rsync src/components/PodcastPlayer/podloveTemplate.html "$out"
rsync api-spec.yaml "$out"
rsync -a --delete node_modules/@podlove/web-player "$out/"
rsync -a --delete icons "$out/"