import cv2 # type: ignore
from cvzone.HandTrackingModule import HandDetector # type: ignore
import numpy as np
import math
import time
cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=3)
offset = 20
imgSize = 300


folder = "data/DURBUR"
counter=0
while True:
    success, img = cap.read()
    hands, img = detector.findHands(img)
    
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgcrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

        # Ensure crop dimensions are valid
        if imgcrop.shape[0] > 0 and imgcrop.shape[1] > 0:
            imgCropShape = imgcrop.shape

            # Resize imgcrop if it exceeds imgWhite dimensions
            if imgCropShape[0] > imgSize or imgCropShape[1] > imgSize:
                imgcrop = cv2.resize(imgcrop, (imgSize, imgSize))

            


            aspectRatio =h/w
            if aspectRatio>1:
                k=imgSize/h
                wcal=math.ceil(k*w)
                imgResize =cv2.resize(imgcrop,(wcal,imgSize))
                imgResizeShape = imgResize.shape
                wgap=math.ceil((300-wcal)/2)
                imgWhite[:, wgap:wcal+wgap] = imgResize

            else:
                k=imgSize/w
                hcal=math.ceil(k*h)
                imgResize =cv2.resize(imgcrop,(imgSize,hcal))
                imgResizeShape = imgResize.shape
                hgap=math.ceil((300-hcal)/2)
                imgWhite[hgap:hcal+hgap, :] = imgResize  

            cv2.imshow("ImageCrop", imgcrop)
            cv2.imshow("ImageWhite", imgWhite)

    cv2.imshow("Image", img)
    key=cv2.waitKey(1)
    if key == ord("s"):
        cv2.imwrite(f'{folder}/Image_{time.time()}.jpg',imgWhite)
        print(counter)
