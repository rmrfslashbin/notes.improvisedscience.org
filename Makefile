default_goal: run

run:
	@echo "Running..."
	hugo server
	@echo "Done."

build:
	@echo "Building..."
	hugo
	@echo "Done."