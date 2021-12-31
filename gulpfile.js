const gulp = require('gulp')
const stylus = require('gulp-stylus')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const browserify = require('browserify')
const babelify = require('babelify')
const vinylSourceStream = require('vinyl-source-stream')
const vinylBuffer = require('vinyl-buffer')
const glob = require('glob')
const eventStream = require('event-stream')
const cleanCss = require('gulp-clean-css')

const buildJs = (done) => {
	glob('./js/*.js', (err, files) => {
		if (err) {
			console.error(err)
			done(err)
		}

		const tasks = files
			.map(file =>
				browserify(
					{ entries: [file] },
					{ debug: true }
				)
					.transform(
						babelify.configure({
							presets: ['@babel/preset-env'],
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{
										absoluteRuntime: false,
										corejs: 3,
										regenerator: true,
										useESModules: false
									}
								]
							]
						})
					)
					.bundle()
					.pipe(vinylSourceStream(file))
					.pipe(vinylBuffer())
					.pipe(uglify())
					.pipe(gulp.dest('./public/'))
					.on('end', () => {
						console.log(`file: ${file} compiled done!`)
					})
			)

		eventStream.merge(tasks)
			.on('error', (err) => {
				console.error(err)
			})
			.on('end', done);
	})
}

const concatJs = () =>
	gulp
		.src('./public/js/*.js')
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./public'))
		.on('end', () => {
			console.log('js concated')
		});


const buildCss = () => {
	const stylusStream = gulp.src('./css/*.styl').pipe(stylus({
		'include css': true,
		compress: true
	}))

	return eventStream
		.merge(gulp.src('./public/css/*.css'), stylusStream)
		.pipe(concat('index.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('./public/'))
		.on('error', (err) => {
			console.error(err)
		})
		.on('end', () => {
			console.log('stylus compiled done!')
		});
}

const watchChange = () => {
	gulp.watch('./css/*.styl', buildCss)
	gulp.watch('./js/*.js', gulp.series(buildJs, concatJs))
}

const buildAndWatch = gulp.series(
	gulp.parallel(buildCss, gulp.series(buildJs, concatJs)),
	watchChange
)

gulp.task('default', buildAndWatch)
