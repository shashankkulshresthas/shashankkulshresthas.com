

var CurrentPageId = 1;
Pages = [
           {
               "PageId": "1",
               "SlideName": "demo1",
               "FilePath": "demo1.html",
               "AudioPath": "demo1.mp3",
               "NextSlide": "demo2",
               "PrevSlide": "null",
               "SlideDuration": "10",
               "CurrentSlide":"false"
           },
           {
               "PageId": "2",
               "SlideName": "demo2",
               "FilePath": "demo2.html",
               "AudioPath": "demo2.mp3",
               "NextSlide": "demo3",
               "PrevSlide": "demo1",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "3",
               "SlideName": "demo3",
               "FilePath": "demo3.html",
               "AudioPath": "demo3.mp3",
               "NextSlide": "demo4",
               "PrevSlide": "demo2",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "4",
               "SlideName": "demo4",
               "FilePath": "demo4.html",
               "AudioPath": "demo4.mp3",
               "NextSlide": "demo5",
               "PrevSlide": "demo3",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "5",
               "SlideName": "demo5",
               "FilePath": "demo5.html",
               "AudioPath": "demo5.mp3",
               "NextSlide": "demo6",
               "PrevSlide": "demo4",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "6",
               "SlideName": "demo6",
               "FilePath": "demo6.html",
               "AudioPath": "demo6.mp3",
               "NextSlide": "demo7",
               "PrevSlide": "demo5",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "7",
               "SlideName": "demo7",
               "FilePath": "demo7.html",
               "AudioPath": "demo7.mp3",
               "NextSlide": "demo8",
               "PrevSlide": "demo6",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "8",
               "SlideName": "demo8",
               "FilePath": "demo8.html",
               "AudioPath": "demo8.mp3",
               "NextSlide": "demo9",
               "PrevSlide": "demo7",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "9",
               "SlideName": "demo9",
               "FilePath": "demo9.html",
               "AudioPath": "demo9.mp3",
               "NextSlide": "demo10",
               "PrevSlide": "demo8",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "10",
               "SlideName": "demo10",
               "FilePath": "demo10.html",
               "AudioPath": "demo10.mp3",
               "NextSlide": "demo11",
               "PrevSlide": "demo9",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "11",
               "SlideName": "demo11",
               "FilePath": "demo11.html",
               "AudioPath": "demo11.mp3",
               "NextSlide": "demo12",
               "PrevSlide": "demo10",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "12",
               "SlideName": "demo12",
               "FilePath": "demo12.html",
               "AudioPath": "demo12.mp3",
               "NextSlide": "demo13",
               "PrevSlide": "demo11",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "13",
               "SlideName": "demo13",
               "FilePath": "demo13.html",
               "AudioPath": "demo13.mp3",
               "NextSlide": "demo14",
               "PrevSlide": "demo12",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "14",
               "SlideName": "demo14",
               "FilePath": "demo14.html",
               "AudioPath": "demo14.mp3",
               "NextSlide": "demo15",
               "PrevSlide": "demo13",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "15",
               "SlideName": "demo15",
               "FilePath": "demo15.html",
               "AudioPath": "demo15.mp3",
               "NextSlide": "demo16",
               "PrevSlide": "demo14",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "16",
               "SlideName": "demo16",
               "FilePath": "demo16.html",
               "AudioPath": "demo16.mp3",
               "NextSlide": "demo17",
               "PrevSlide": "demo15",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "17",
               "SlideName": "demo17",
               "FilePath": "demo17.html",
               "AudioPath": "demo17.mp3",
               "NextSlide": "demo18",
               "PrevSlide": "demo16",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "18",
               "SlideName": "demo18",
               "FilePath": "demo18.html",
               "AudioPath": "demo18.mp3",
               "NextSlide": "demo19",
               "PrevSlide": "demo17",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "19",
               "SlideName": "demo19",
               "FilePath": "demo19.html",
               "AudioPath": "demo19.mp3",
               "NextSlide": "demo20",
               "PrevSlide": "demo18",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           },
           {
               "PageId": "20",
               "SlideName": "demo1",
               "FilePath": "demo20.html",
               "AudioPath": "demo20.mp3",
               "NextSlide": "null",
               "PrevSlide": "demo19",
               "SlideDuration": "10",
               "CurrentSlide": "false"
           }
];


function SlideLoad(CurrentPageId)
{
    debugger
    if (CurrentPageId == 1)
    {        
        location.href = Pages[0].FilePath;

    }
    else if (CurrentPageId == 20) {       
        location.href = Pages[19].FilePath;
    }
    else {            
        location.href = Pages[CurrentPageId - 1].FilePath;
    }
}

function nextSlide(CurrentPageId)
{
    debugger
    if (CurrentPageId == 1) {
        location.href = Pages[CurrentPageId].FilePath;

    }
    else if (CurrentPageId == 20) {
        //location.href = Pages[CurrentPageId].FilePath;
    }
    else {
        location.href = Pages[CurrentPageId].FilePath;
    }

}

function prevSlide(CurrentPageId) {
    debugger
    if (CurrentPageId == 1) {
        //location.href = Pages[0].FilePath;

    }    
    else {
        location.href = Pages[CurrentPageId-2].FilePath;
    }
}