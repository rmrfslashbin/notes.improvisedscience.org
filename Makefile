default_goal: run

run:
	@echo "Running..."
	hugo server
	@echo "Done."

build:
	@echo "Building..."
	rm -rf public
	hugo
	@echo "Done."

deploy: build
	@echo "Deploying..."
	hugo deploy