NAME=dashy
PLATFORM=linux/amd64
CONTAINER_REGISTRY=mondayworks.azurecr.io
BUILD_NUMBER:=latest

.PHONY: build
build: BUILDER=$(NAME)-builder
build:
	-docker buildx create --name $(BUILDER)
	docker buildx build --platform $(PLATFORM) --builder $(BUILDER) -t $(NAME) . --load
	docker buildx rm $(BUILDER)

.PHONY: deliver
deliver:
	docker tag $(NAME):latest $(CONTAINER_REGISTRY)/$(NAME):$(BUILD_NUMBER)
	docker push $(CONTAINER_REGISTRY)/$(NAME):$(BUILD_NUMBER)
	# docker tag $(NAME):latest $(CONTAINER_REGISTRY)/$(NAME):latest
	# docker push $(CONTAINER_REGISTRY)/$(NAME):latest

.PHONY: cd
cd: PLATFORM=linux/arm/v7
cd: build deliver


# az:
# 	az --version

# setup: build

# run:
# 	-docker rm $(NAME)
# 	docker run -d \
# 		-p 20000:80 \
# 		--restart unless-stopped \
# 		--name $(NAME) \
# 		$(NAME)

# teardown:
# 	-docker kill $(NAME)