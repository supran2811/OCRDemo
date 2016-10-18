// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Expecting this line in file named key.js
// var apiKey = "[YOUR API KEY HERE]";
var CV_URL = "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;

$(document).ready(function() {
  $('#fileform').on('submit', uploadFiles);
});

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles(event) {
  event.preventDefault(); // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile(event) {
  var content = event.target.result;
  sendFileToCloudVision(
      content.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", ""));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision(content) {
  var type = "TEXT_DETECTION";//$("#fileform [name=type]").val();

  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
        maxResults: 200
      }]
    }]
  };

  $('#results').text('Loading...');
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function(jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(process);
}

function process(data){
    console.log(data);
    
    var responses = data.responses;
    
    var res = responses[0].textAnnotations;
    
     $('#firstname').val(res[2].description);
    $('#lastname').val(res[3].description);
    $('#position').val(res[4].description+" "+res[5].description+" "+res[6].description);
    $('#department').val(res[8].description+" "+res[9].description+" "+res[10].description+" "+res[11].description+" "+res[12].description);
    $('#company').val(res[13].description+" "+res[14].description+" "+res[15].description+" "+res[16].description+" "+res[17].description+" "+res[18].description+" "+res[19].description+" "+res[20].description);
    $('#address').val(res[21].description+" "+res[22].description+" "+res[23].description+" "+res[24].description+" "+res[25].description+" "+res[26].description+" "+res[27].description+" "+res[28].description+" "+res[29].description+" "+res[30].description+" "+res[31].description+" "+res[32].description+" "+res[33].description+" "+res[34].description+res[35].description);
    $('#residence').val(res[37].description+res[38].description+res[39].description);
    $('#official').val(res[43].description+res[44].description);
    $('#mobile').val(res[41].description);
    
    
    
    $('#results').text('Loaded');
}

/**
 * Displays the results.
 */
function displayJSON(data) {
  var contents = JSON.stringify(data, null, 4);
  $("#results").text(contents);
}
