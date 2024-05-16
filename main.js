song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
song1_status = false;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('pose is initiallized');
}

function gotPoses(results) {
    if (results > 0) {
        scorerightwrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreleftwrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw() {
    if (song1.isPlaying()) {
        song1_status = true;
    } else {
        song1_status = false;
    }

    image(video, 0, 0, 600, 400);
    fill("#FF0000");
    stroke("#FF0000");

    if (scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song1_status == False) {
            play_song(song1)
            update_heading_tag("song1")
        }
        if (song1_status) {
            song1.play();
            song1_status = true;
            document.getElementById("song").innerHTML = "Harry Potter";
        }
    }
}