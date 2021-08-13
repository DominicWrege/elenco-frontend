#!/bin/bash

out=public

rsync src/components/PodcastPlayer/podloveTemplate.html "$out"
rsync api-spec.yaml "$out"
rsync -a --delete icons "$out/"